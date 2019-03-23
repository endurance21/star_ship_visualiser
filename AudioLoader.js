 class AudioLoader {
    constructor(){
    this.loadedAudioCount = 0;
    this.TotalAudioCount = 0 ;
    this.audios = [] ;
    this.allAudioLoaded = false ;
    this.onEveryAudioLoaded = () => { return 0; }
    this.onEachAudioloaded = () => {return 0; }
   }
   load (path) {
      this.TotalAudioCount++;
      let currentAudio = new Audio(path);
      this.audios.push(currentAudio);
      let loader = this;
      currentAudio.onloadeddata = () => {
         loader.loadedAudioCount++;
         loader.onEachAudioloaded();
         if(loader.loadedAudioCount == loader.TotalAudioCount){
            loader.allAudioLoaded = true ;
             loader.onEveryAudioLoaded();
         } 
      }
      return currentAudio;
   }
} 
  
 

 