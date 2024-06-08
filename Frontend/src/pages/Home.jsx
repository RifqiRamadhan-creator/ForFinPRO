import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getTask, getNick } from "../actions/user.action";
import { myNewestPet } from "../actions/pet.action";
import petImageMapping from "../actions/pet.images";
import { Button, Card, CardContent, Typography } from "@mui/material";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [nickname, setNickname] = useState("");
  const [newestPet, setNewestPet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const username = localStorage.getItem("username");
        const taskData = await getTask(username);
        setTasks(taskData);

        const nicknameData = await getNick(username);
        setNickname(nicknameData.nickname);

        const petResponse = await myNewestPet(username);
        if (petResponse.success) {
          setNewestPet(petResponse.data);
        } else {
          setError("Failed to fetch my newest pet");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleViewTasks = () => {
    navigate("/Task");
  };

  const handleLinkClick = () => {
    const username = localStorage.getItem("username");
    localStorage.setItem('username', username);
  };

  const today = new Date().toLocaleDateString();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.app}>
      <nav style={styles.navbar}>
        <div style={styles.navbarContent}>
          <span>{today}</span>
          <span>Good Morning {nickname}</span>
        </div>
      </nav>
      <div style={styles.container}>
        <div style={styles.cardContainer}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Tasks for {nickname}
              </Typography>
              {tasks.length > 0 ? (
                <div>
                  <div style={styles.task}>
                    <Typography variant="subtitle1" gutterBottom>
                      {tasks[0].name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Category: {tasks[0].category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Status: {tasks[0].status === "Completed" ? "idle" : tasks[0].status}
                    </Typography>
                  </div>
                  {tasks[1] && (
                    <div style={styles.task}>
                      <Typography variant="subtitle1" gutterBottom>
                        {tasks[1].name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Category: {tasks[1].category}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Status: {tasks[1].status === "Completed" ? "idle" : tasks[1].status}
                      </Typography>
                    </div>
                  )}
                </div>
              ) : (
                <Typography variant="body2" color="textSecondary" component="p">
                  No recent tasks found.
                </Typography>
              )}
              <Button onClick={handleViewTasks} variant="contained" color="primary">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                My Newest Pet
              </Typography>
              {newestPet.length > 0 ? (
                newestPet.map((pet) => (
                  <div key={pet.id} style={styles.pet}>
                    <img style={styles.petImage} src={petImageMapping[pet.pet_avatar]} alt={pet.name} />
                    <Typography variant="subtitle1" gutterBottom>
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Obtained at level {pet.minimum_level}
                    </Typography>
                    <Link to={`/myPets`} onClick={handleLinkClick}>
                      <Button variant="contained" color="primary">
                        See my other pets
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" component="p">
                  No pets found.
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    margin: "0",
    padding: "0",
  },
  navbar: {
    backgroundColor: "#282c34",
    padding: "1rem",
    color: "white",
    flexShrink: "0",
  },
  navbarContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    padding: "2rem",
    overflow: "hidden",
  },
  cardContainer: {
    display: "flex",
    flex: "1",
    justifyContent: "space-between",
  },
  card: {
    flex: "1",
    margin: "0 1rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  task: {
    marginBottom: "0.5rem",
  },
  pet: {
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  petImage: {
    height: "100px",
    marginBottom: "0.5rem",
  },
};

export default App;
