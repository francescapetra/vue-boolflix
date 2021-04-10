 var app = new Vue(
  {
    el:"#root",
    data:{
      films: [],
      searchFilm:"",
    },
    methods: {
      apiSearch:function(){
        console.log("pippo");
        axios.get("https://api.themoviedb.org/3/search/multi",{
          params:{
            api_key:"143011c614d2d290369cd7730a404df2",
            query: this.searchFilm,
            language: "it-IT",
            page: 1,
            include_adult: false,
          }
        })
        .then((request)=>{
          const result = request.data.results;
          this.films = result;
          console.log(result);
          this.filmRate();
        })
        this.searchFilm = "";
      },
      filmRate: function(){
        this.films.forEach((item, i) => {
          const vote = (item.vote_average/2);
          let starVote = Math.ceil(vote);
          item.vote_average = starVote;
        });

      }
    },
  }
);
