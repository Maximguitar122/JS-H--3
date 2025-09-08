class DogFact{
  constructor(fact){
    this.fact = fact;
  }
  render(){
    return `<p>${this.fact}</p>`;
  }

}
document.addEventListener("DOMContentLoaded",() => {
  const button =  document.getElementById("get");

  const input = document.getElementById("facts");
  const output = document.getElementById("write");
  button.addEventListener("click", async  () => {
    let count = parseInt(input.value) || 1;
    if (count < 1){
      count = 1;
    }
    if (count > 3){
      count = 3;
    }
    try{
      const res = await fetch(`https://dogapi.dog/api/v2/facts?limit=${count}`);
      if (!res.ok) throw new Error("Помилка при відтворенні");
      const result = await res.json();
      output.innerHTML = result.data
        .map(f => new DogFact(f.attributes.body).render())
        .join("");
    } catch (error) {
      output.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }

  });
});
