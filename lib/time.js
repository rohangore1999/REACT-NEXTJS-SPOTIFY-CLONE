// it is just a helper function which convert millisec to seconds
export function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000); //seconds conversion
    const seconds = ((millis % 60000) / 1000).toFixed(0);
  
    return seconds == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }