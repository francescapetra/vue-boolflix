 var app = new Vue(
  {
    el:"#root",
    data:{
      api_key:"143011c614d2d290369cd7730a404df2",
      films: [],
      seriesTv:[],
      searchFilm:"",
    },
    methods: {
      apiSearch:function(){
        console.log(this.searchFilm);
        axios.get("https://api.themoviedb.org/3/search/movie",{
          params:{
            api_key:this.api_key,
            query: this.searchFilm,
            language: "it-IT",
            page: 1,
            include_adult: false,
          }
        })
        .then((request)=>{
          let result = request.data.results;
          this.films = result;
          this.filmRate(this.films);
          console.log(result);
        })
        axios.get("https://api.themoviedb.org/3/search/tv",{
          params:{
            api_key:this.api_key,
            query: this.searchFilm,
            language: "it-IT",
            page: 1,
            include_adult: false,
          }
        })
        .then((request)=>{
          let tvResult = request.data.results;
          this.seriesTv = tvResult;
          this.filmRate(this.seriesTv);
          console.log(tvResult);
        })
        this.searchFilm = "";
      },

      filmRate(array){
        array.forEach((item, i) => {
          if (!isNaN(item.vote_average)) {
            const vote = (item.vote_average/2);
            let starVote = Math.ceil(vote);
            item.vote_average = starVote;
          }
        //   function imageExists(){
        //
        //     var http = new XMLHttpRequest();
        //     http.open('HEAD', image_url, false);
        //     http.send();
        //     return http.status != 404;
        //
        // }
        });
      }
    },
  }
);
