

const jetpack = require('fs-jetpack')

const create = function(ws,x_time){
  let arr = []
  let text = x_time
  let proverka = parseFloat(text)
  if(isNaN(proverka)){
    let arr_w = ['воскресенье','понедельник','вторник','среду','четверг','пятницу','субботу']
    let s = arr_w.indexOf(text)
    let fff = new Date()
    if(s == -1){
      s = fff.getDay()+1
    }
    let zzz = fff.getDay()
    let sym = s - zzz
    sym<=0?sym = 7 + sym:'';
    sym = sym * 86400000
    let ggg = fff.getDate()
    ggg<10?ggg='0'+ggg:'';
    let y = new Date(fff.getFullYear()+'-'+(fff.getMonth()+1)+'-'+ggg+'T00:00:00.000Z')
    y = Date.parse(y)
    y+=sym
    x_time = new Date(y)
  }else{
    let fff = new Date()
    let year = fff.getFullYear()
    let nn = 1
    let zzz = fff.getDate()
    let sym = proverka - zzz
    sym<=0?nn += 1:'';
    let month = fff.getMonth()+nn
    if(month>12){month=1;year+=1}
    let ddd =fff.getDate()+sym
    ddd < 10?ddd='0'+ddd:'';
    month < 10?month='0'+month:'';
    x_time = new Date(year+'-'+month+'-'+ddd+'T00:00:00.000Z')
  }
  arr = text_napominaniya(ws,arr,x_time)
}
exports.create = create;

const text_napominaniya = function(ws,arr,x_time){
  ws.users.input_Array[4] = 'none'
  let n = 0
  let t = 0
  let k = 0
  let int_id00 = ws.users.all_thoughts.length
  ws.send('текст напоминания')
  ws.users.all_thoughts[int_id00] = setInterval(()=>{
    n++
    console.log(n)

    if(!ws.users.aska_talks){
      clearInterval(ws.users.all_thoughts[int_id00])
      ws.users.all_thoughts.splice(int_id00,1)

      let int_id01 = ws.users.all_thoughts.length
      ws.users.all_thoughts[int_id01] = setInterval(()=>{
        t++
        console.log(t)
        if(ws.users.aska_talks){
          console.log('YOU HERE <----------------')
          clearInterval(ws.users.all_thoughts[int_id01])
          ws.users.all_thoughts.splice(int_id01,1)
          let int_id02 = ws.users.all_thoughts.length
          console.log(int_id02)
          ws.users.all_thoughts[int_id02] = setInterval(()=>{
            k++
            console.log(k)
            if(ws.users.input_Array[4] == 'всё'){
              clearInterval(ws.users.all_thoughts[int_id02])
              console.log(int_id02)
              ws.users.all_thoughts.splice(int_id02,1)
              ws.send('записала')
              arr = arr.join(', ')
              let arr_o = jetpack.read('./JSON/data/'+ws.users.name+'/one_time_napominanie.json','json')
              !arr_o?arr_o = []:'';
              arr_o.push([x_time,arr])
              ws.send('SYSTEM one_time_napominanie = '+JSON.stringify(arr_o))
              jetpack.write('./JSON/data/'+ws.users.name+'/one_time_napominanie.json',arr_o)
              //console.log(arr)
            }else{
              let c = ws.users.input_Array[4]
              if(c!='none'){
                arr.push(c)
                //arr = jetpack.read('./JSON/data/'+ws.users.name+'/todo.json','json')
                // arr = quest_data_base_4D.create_node(arr,a,b,c)
                // jetpack.write('./JSON/data/'+ws.users.name+'/todo.json',arr)
                ws.users.input_Array[4] = 'none'
              }
            }
            if(k>2000){
              console.log('clear interval_03')
              clearInterval(ws.users.all_thoughts[int_id02])
              ws.users.all_thoughts.splice(int_id02,1)
            }
          },500)

        }
        if(t>100){
          clearInterval(ws.users.all_thoughts[int_id01])
          ws.users.all_thoughts.splice(int_id01,1)
          console.log('Interval Close')
        }
      },500)
    }
    if(n>100){
      clearInterval(ws.users.all_thoughts[int_id00])
      ws.users.all_thoughts.splice(int_id00,1)
      console.log('Interval Close')
    }
  },500)
  return arr
}
