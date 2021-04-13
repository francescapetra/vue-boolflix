 var app = new Vue(
  {
    el:"#root",
    data:{
      api_key:"143011c614d2d290369cd7730a404df2",
      films: [],
      seriesTv:[],
      mergedTvFilm:[],
      movie: "Film",
      serie:"Serie",
      searchFilm:"",
    },
    methods: {
      apiSearch:function(){
        this.mergedTvFilm= [];
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
          this.createMergedArray(this.films,this.mergedTvFilm,this.movie);
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
          // this.mergedTvFilm= [];
          let tvResult = request.data.results;
          this.seriesTv = tvResult;
          this.createMergedArray(this.seriesTv,this.mergedTvFilm,this.serie);
          this.filmRate(this.seriesTv);
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
        });
      },
      createMergedArray: function(array,array2,genere){
        console.log("volta");
        array.forEach((item, i) => {
          item['type'] = genere;
          array2.push(item);
        });
      },
      filterMerged: function(array){
        let popular = false;
        array.forEach((item, i) => {
           if(item.vote_average>=4){
             popular = true;
           }
        });
        return popular;
      }
    },
  }
);
