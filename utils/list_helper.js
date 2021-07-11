const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
let count = 0
  blogs.forEach(item => {
      count += item.likes
  })
  if (count===0) {
    return 0
  }
  //console.log("final: ", count);
  return count
}

module.exports = {
  dummy, totalLikes
}
