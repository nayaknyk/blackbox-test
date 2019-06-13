  var config = {
      apiKey: "AIzaSyA8321tBph_3LMdTCAKQWppaJSnNxnI5HQ",
      authDomain: "blackbox-243206.firebaseapp.com",
      databaseURL: "https://blackbox-243206.firebaseio.com",
      projectId: "blackbox-243206",
      storageBucket: "blackbox-243206.appspot.com",
      messagingSenderId: "720475383058",
      appId: "1:720475383058:web:6d3673ab698a9f8c"
  };
  firebase.initializeApp(config);

//create user
function createAccount(){
  var data = {
  email: $('#registerEmail').val(),
  password : $('#registerPassword').val()
};

firebase
  .auth()
  .createUserWithEmailAndPassword(data.email, data.password)
  .then( function(user){
    alert("User account created successfully");
    window.location.replace("index.html")
  })
  .catch(function(error){
    alert("Error creating user:", error);
  });
    return false;
}

//login
function loginAccount(){
  var data = {
  email    : $('#loginEmail').val(),
  password : $('#loginPassword').val()
};

var auth = null;
firebase
  .auth()
  .signInWithEmailAndPassword(data.email, data.password)
  .then( function(user){
    console.log("Authenticated successfully with payload:", user);
    auth = user;
    firebase.auth().onAuthStateChanged(user => {
        if(auth){
            window.location.replace("dashboard.html");
        }
    })
  })
  .catch(function(error){
    window.alert("Login Failed!", error);
  });
    return false;
}