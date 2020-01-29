/*
  SOURCE FOR THIS FUNCTION: https://stackoverflow.com/questions/58973108/how-to-get-my-bot-to-get-random-messages-that-are-already-sent-from-users-in-a-c
*/

exports.fetchAllMessages = (channel, limit) => {
  return new Promise((resolve, reject) => {

    // 1. get first 100 or limit
    channel.fetchMessages({limit: limit < 100 ? limit : 100})
    .then(collection => {

      // -- next batch funtion declaration -- //
      const nextBatch = () => {
        let remaining = limit - collection.size;

        channel.fetchMessages({limit: remaining<100 ? remaining : 100, before: collection.lastKey()})
        .then(next => {
          let concatenated = collection.concat(next);

          // 3a. resolve when limit is met or when no new msgs were added (reached beginning of channel)
          if (collection.size >= limit || collection.size == concatenated.size) return resolve(concatenated);

          collection = concatenated;

          // 3b. or continue getting next 100
          nextBatch();
        })
        .catch(error => reject(error));
      }

      // 2. call function for next 100
      nextBatch();
    })
    .catch(error => reject(error));
  });
}
