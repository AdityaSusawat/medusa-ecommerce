<script lang="ts">

    let posts: any[] = [];
  
    async function fetchPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (response.ok) {
        posts = await response.json();
      }
    }
  
    fetchPosts();
</script>
   
<main>
<h1>Posts</h1>
<ul>
    {#each posts as post (post.id)}
    <li>{post.title}</li>
    {/each}
</ul>
</main>

<style>
ul {
    list-style: none;
}
li {
    margin: 5px 0;
}
</style>