export function memfmt(n) {
    if (n >= 1e9) {
        return (n / 1e9).toFixed(2) + "G";
    } else if (n >= 1e6) {
        return (n / 1e6).toFixed(2) + "M";
    } else if (n >= 1000) {
        return (n / 1000).toFixed(2) + "K";
    }
    return n.toFixed(2);
}
