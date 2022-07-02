//axios for login route data
const loginSubmit = document.getElementById("login-submit")
loginSubmit.addEventListener("click", 
  async (event) => {
      event.preventDefault();
      console.log("I am axios POST req for login")
      try {
        const email = document.getElementById("Email").value;
        const password = document.getElementById("password").value;
          const body = {email, password}
          console.log(body);
          const loginPage = await axios.post("/home/login", body);
          console.log("axios POST req to login page!");
          if(loginPage.data.success){
            window.location = "/game"
          }
      } catch (err) {
          console.log(err);
      }
  }
);