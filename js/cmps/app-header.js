export default {
    template: `
    <header class="app-header">
      <div class="logo">
      <h1>Miss books</h1>
      </div>
      <nav>
            <router-link to="/" exact >Home</router-link> |
           
            <router-link to="/book" >Books</router-link> |
            <router-link to="/about" >About</router-link> 
        </nav>
    </header>
    `,
};