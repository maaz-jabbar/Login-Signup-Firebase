var auth = firebase.auth();
var db = firebase.firestore();

function signIn(){
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((user)=>{
        alert("Youre Signed in")     
        console.log(user)
        localStorage.setItem('uid', user.user.uid);
        window.location = "./home.html"
    })
    .catch(function(error) {
        // Handle Errors here.
       alert(error.Message)
     });
}

function signup(){
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    const userName = document.getElementById('username').value;
    
 

    firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((user)=>{
    alert("User Created")

    console.log(user)
    saveUserDetailsToDB(userName, userEmail, user.user.uid);
    localStorage.setItem('uid', user.user.uid);
    
})
.catch(function(error) {
    // Handle Errors here.
    alert(error.Message)
  });
}

/*Function to get user detials from DB*/
function getUserDetails() {
    var userUid = localStorage.getItem('uid');
    getUserInfo(userUid);
    getAllPosts(userUid);
    //getUserPosts(userUid);
}

/*Function to get user info from DB*/
function getUserInfo(uid) {
    db.collection("users").where("uid", "==", uid)
        .get()
        .then(function (userSnapshot) {
            userSnapshot.forEach(function (userDoc) {
                //userDoc.data() 
                //userDoc.id
                greetUser(userDoc.data());
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

/*Function to greet user*/
function greetUser(user) {
    document.getElementById('greet-user').innerHTML = `Welcome ${user.userName}`
}

/*Function to get todos from DB*/
function getAllPosts(uid) {
    db.collection("posts")
        .onSnapshot(function (todoSnapshot) {
            todoSnapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {
                    makeTodoElements(change.doc.id, change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified todo: ", change.doc.data());
                    updateTodoToDOM(change.doc.data(), change.doc.id);
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data(), change.doc.id);
                    deleteTodoFromDOM(change.doc.id);
                }
            });
        });

}



/*Function to make todo elements*/
function makeTodoElements(docId, docData) {
   document.getElementById(post-div).innerHTML = `<span>${docData}</span>`
}













const forgetPass = ()=>{
    var email = prompt("Enter Email Address:");
   
  firebase.auth().sendPasswordResetEmail(email)
  .then(function() {
   alert("Email sent")
  }).catch(function(error) {
    alert(error)
  });
}





/*Function to save user details to DB*/
function saveUserDetailsToDB(userName, userEmail, uid) {
    db.collection("users").add({
        userName,
        userEmail,
        uid
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            location = './home.html';
        })
}






/*Function to add Todo in DB*/
function addPost() {
    var post = document.getElementById('post-add').value;
    db.collection("posts").add({
        post, // todo: todo
        uid: localStorage.getItem('uid')
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
    document.getElementById('todo').value = '';
}
