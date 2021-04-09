 var app = new Vue(
  {
    el:"#root",
    data:{
      films: [
      ],
      searchFilm:"",
    },
    methods: {
      apiSearch:function(){
        console.log("pippo");
        axios.get("https://api.themoviedb.org/3/search/movie",{
          params:{
            api_key:"143011c614d2d290369cd7730a404df2",
            query: this.searchFilm,
            language: "it-IT"
          }
        })
        .then((request)=>{
          const result = request.data.results;
          this.films = result;
          console.log(result);
        })
        this.searchFilm = "";
      }
    },
  }
);
