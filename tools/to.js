const to = (promise) => {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err, null]);
}

exports.to = to;