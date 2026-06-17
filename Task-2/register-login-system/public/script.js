const API = "http://localhost:5000";

async function registerUser(){
  const data = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    password: document.getElementById("password").value
  };
  const response = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  alert(result.message);
}

async function loginUser(){
  const data = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value
  };
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if(response.ok){
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html";
  }else{
    alert(result.message);
  }
}