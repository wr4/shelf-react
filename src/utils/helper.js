export const type2num = (type) => {
    const link = {
        proto: 1,
        channel: 2,
        group: 3
    }
    return link[type] || 0
}