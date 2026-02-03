<script lang="ts">
	import LyricBox from "$lib/assets/LyricBox.svelte";
	import LyricSearch from "$lib/assets/LyricSearch.svelte";

  let data = $state<any>();
</script>

<div>
  <LyricSearch bind:result={data}/>
  <LyricBox {data} />
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