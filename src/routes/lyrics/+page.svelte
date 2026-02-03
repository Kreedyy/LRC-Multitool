<script>
	import LyricBox from "$lib/assets/LyricBox.svelte";
	import LyricSearch from "$lib/assets/LyricSearch.svelte";
	import { onMount } from "svelte";
  async function search() {
    const response = await fetch('/api/lyrics?q=i+hate+bipolar+girls');
    const data = await response.json();
    console.log(data);
  }
  
  onMount(() => {
    search();
  });
</script>

<div>
  <LyricSearch />
  <LyricBox />
</div>

<style>
  div{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
</style>