// Random GUID generator taken from https://stackoverflow.com/a/105074/5743554
// From Jon Surrell https://stackoverflow.com/users/1432801/jon-surrell

const guid = () => {
  const s4 = () => (
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  );
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

// Iterable function taken from https://stackoverflow.com/a/32538867/5743554
// From Tomas Kulich https://stackoverflow.com/users/1761457/tomas-kulich

const isIterable = (obj) => {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
};

exports.createCallbag = () => {
  const speakers = []; // Holds the functions that are allowed to speak to the callbag.
  const listeners = []; // Holds the functions that are called when a speaker talks to the callbag.

  /*------------------------------------*/
  /* Add a listener function            */
  /*                                    */
  /* Input: a function                  */
  /* Output: the uuid of the function   */
  /*         for future removal         */
  /*------------------------------------*/
  const speakTo = (listenerFn) => {
    const uuid = guid();

    listeners.push({
      uuid,
      fn: listenerFn,
    });

    return uuid;
  };

  /*------------------------------------*/
  /* Remove a listener function         */
  /*                                    */
  /* Input: an uuid                     */
  /* Output: a boolean true if the uuid */
  /*         was found and the function */
  /*         removed.                   */
  /*------------------------------------*/
  const stopSpeakingTo = (uuid) => {
    const listenerIndex = listeners.findIndex(listener => (listener.uuid === uuid));

    if (listenerIndex > -1) {
      listeners.splice(listenerIndex, 1);
      return true;
    }

    return false;
  };

  /*------------------------------------*/
  /* Speak directly to the callbag      */
  /*                                    */
  /* Input: arguments to pass to the    */
  /*        listeners                   */
  /* Output: none                       */
  /*------------------------------------*/
  const hearNow = function h(...args) {
    listeners.forEach((listener) => {
      listener.fn(...args);
    });
  };

  /*------------------------------------*/
  /* Add a speaker function             */
  /*                                    */
  /* Input: a function                  */
  /* Output: an object holding          */
  /*         - the uuid of the function */
  /*           for future removal       */
  /*         - the speak function to be */
  /*           used                     */
  /*------------------------------------*/
  const hearFrom = (speakerFn) => {
    const uuid = guid();

    speakers.push({
      uuid,
      fn: speakerFn,
    });

    return {
      uuid,
      speak: function s(...args) {
        if (speakers.findIndex(speaker => (speaker.uuid === uuid)) > -1) {
          const res = speakerFn(...args);

          if (typeof res === 'string' || !isIterable(res)) {
            hearNow(res);
          } else {
            hearNow(...res);
          }
        }
      },
    };
  };

  /*------------------------------------*/
  /* Remove a speaker function          */
  /*                                    */
  /* Input: an uuid                     */
  /* Output: a boolean true if the uuid */
  /*         was found and the function */
  /*         removed.                   */
  /*------------------------------------*/
  const stopHearingFrom = (uuid) => {
    const speakerIndex = speakers.findIndex(speaker => (speaker.uuid === uuid));

    if (speakerIndex > -1) {
      speakers.splice(speakerIndex, 1);
      return true;
    }

    return false;
  };

  return {
    speakTo,
    stopSpeakingTo,
    hearNow,
    hearFrom,
    stopHearingFrom,
  };
};
