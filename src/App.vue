<template>
  <div id="nav">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Softelligence Engineering</h1>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/new-list">New List</router-link> |
      <router-link to="/settings">Settings</router-link>
    </div>
  </div>
  <div class="page-container">
    <router-view/>
  </div>
</template>
<style>
body {
  padding: 30px;
}

* {
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 30px;
  margin: 0 -30px 30px;
  border-bottom: 1px solid #42b983;
}

#nav img {
  height: 60px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  padding: 10px;
  cursor: pointer;
  border: 2px solid #2c3e50;
}
.icon:hover {
  opacity: 0.7;
}
.icon.rounded {
  border-radius: 6px;
}
.icon.remove,
.icon.delete {
  border-color: #dc3545;
  color: #dc3545;
}
.icon.accept {
  border-color: #42b983;
  color: #42b983;
}
.icon.edit {
  border-color: #007bff;
  color: #007bff;
}
.icon.disabled {
  pointer-events: none;
  border-color: #6c757d;
  color: #6c757d;
  opacity: 0.5;
}
.icon.favourite {
  border-color: #ffc107;
  color: #ffc107;
}
.icon.favourite-active {
  background-color: #ffc107;
  color: black;
  border: none;
  pointer-events: none;
}
input {
  border-radius: 6px;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  border: 1px solid #2c3e50;
}
input:focus {
  border-color: #42b983;
}
ul { margin: 0; padding: 0; list-style-type: none; }
</style>
