module.exports = {
    random: (length) => {
        return Array(length).fill().map(() =>
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.random() * 62)).join("")
    }
}
