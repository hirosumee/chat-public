var mongoose=require('mongoose');
var messageSchema=mongoose.Schema({
  room:String,
  sender:String,
  time:String,
  content:String
});
var message=module.exports=mongoose.model('message',messageSchema);
module.exports.Create=function(msg)
{
  console.log(msg);
  message.create(msg);
};
module.exports.getmessage=function(room,callback){
  return message.find({room:room},callback);

}
