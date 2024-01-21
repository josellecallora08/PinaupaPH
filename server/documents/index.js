module.exports = ({name ="Joselle Callora", deposit, advance, unit_no, rent}) => {
const today = new Date()
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let month = months[today.getMonth()]
let date = today.getDate()
if(date < 10){
  date = "0" + date
}
let year = today.getFullYear()


return `
<!DOCTYPE html>
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
   </head>
   <body>
      ${month} ${date}, ${year}
      ${name}
      ${deposit}
      ${advance}
      ${unit_no}
      ${rent}
   </body>
</html>
`
}