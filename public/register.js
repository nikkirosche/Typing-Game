//axios for register route data
console.log("Testing")
const registerSubmit = document.getElementById("register-submit");
registerSubmit.addEventListener("click",
 async (event) => {
    event.preventDefault();
    console.log("I am axios POST req for register");
    try {
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const body = {email, name, username, password}
      const registerPage = await axios.post("/register", body);
      console.log(registerPage)
      if(registerPage.data.success){
          window.location = "/login"
      }
      console.log("axios POST req to register page!");
    } catch (err) {
      console.log(err);
    }
  }
);






