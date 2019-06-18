<script>
  export let geo = {
    country: "RU",
    city: "Ufa",
  };
</script>

<td>
  <div class="flag flag-{geo.country.toLowerCase()}"></div>
  <span>{geo.city}</span>
</td>
