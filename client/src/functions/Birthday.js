export default function Birthday({pet}){
    const today = new Date().getDate();
    // const date = [(today.getMonth() + 1), today.getDate()]
    const age = pet.birthday.split("-").slice(1);
  
    const currentAge = today - age[1];
  
    function image() {
      switch (currentAge) {
        case 0:
          return pet.breed.age[0].image;
        case 1:
          return pet.breed.age[1].image;
        case 2:
          return pet.breed.age[2].image;
        case 3:
          return pet.breed.age[3].image;
        default:
          return pet.breed.age[3].image;
      }
    }
    return (
        <img src={image()} alt ="pet"/>
    )
}