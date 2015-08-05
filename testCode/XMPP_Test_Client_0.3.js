/*
* This is a test script to test the XMPP Connection/Client
*/
'use strict';

//Load the required libraries
var Client = require('facebook-live-chat/lib/client'),
    User = require('facebook-live-chat/lib/user'),
    Message = require('facebook-live-chat/lib/message');

//Page Access Token
var pageAccessToken = 'CAAUZCLCSif34BAHwHZBFQZBa5XdA9fVLOqT5wfTf50NkMBXiNr5b7Yvktg2bN3qd6P7dotXDi7ZBrJNyLbkrJso6p7sI03B4fISEGZAnuwoBwPNYtZBoYXOozipDfk59ZAXZAgGJjPw6n3u1piZAeGu3eoKejGHOs8vMdSbRJHEXwigeZBDcNafTSjafCEmngxhPWOaFm3GTFTGwZDZD';
var chat_state_file = 'chat_state.dat';

var client = new Client(
{
	//App ID of XMPP on Messenger App - the Test App
	app_key: '1476833709293438',
	access_token: pageAccessToken,
	chat_state_path: chat_state_file
});


/*
* On Connection event
*/
client.on('online', function (user) 
{
	console.log('Connected as ' + user.getDisplayName() + '!');
	  
//	var meesage_to_send = send_message.sendMsg();
	//var message_to_send = sendMessage('This is Balance from client');
	//var message_to_send = sendMessage('Yes');
	//var message_to_send = sendMessage('Chat');
	/*
	 * Need to update with CommerceUserToken, tokens that represent people who 
	 * message your app with Messenger for business
	 */
	var recipient = new User(/*CommerceUserToken*/);
	var message = new Message(client.me, recipient, "Sample Message", null);
	/*
	* Need to add the logic to send the message
	*/
	client.send(message);
});

/*
* On Message receive event
*/
client.on('message', function (message) 
{
  console.log('Received message: ' + message.text + ' from: ' + message.sender.id);
  var message_to_send = sendMessage(message.text);
  console.log('Meesage to be sent to the Customer=' + message_to_send);

  //Add logic to send a response back to the sender here
});



function sendMessage(data) {
	var ret_message = 'default';
	var balance_srch_string = 'Balance';
	var payment_srch_string = 'Yes';
	var chat_srch_string = 'chat';
 

        console.log("Message received from the customer - ", data);
        //var searchPosition = data.search(/balance_srch_string);
         var searchPosition_balance = data.search(new RegExp(balance_srch_string, "i"));
         var searchPosition_pay= data.search(new RegExp(payment_srch_string, "i"))
         var searchPosition_chat= data.search(new RegExp(chat_srch_string, "i"));
    
      	if (searchPosition_balance != -1){
        	ret_message = sendBalanceMessage();
      	} else if (searchPosition_pay != -1) {
			ret_message = sendPayMessage();  
		} else if (searchPosition_chat != -1) {
	           ret_message =  sendChatMessage();
	   	 } else {                                              
	   	 	console.log('No valid srch String found in unstructured data. Forwarding to live chat');
	   	 	ret_message = 'Message not understood: Please respond with CHAT for liveChat';
		};
		return ret_message;
	} 

	function sendBalanceMessage(){
		return 'Your balance is $650.00'; // Hard Coded value
	}
	function sendPayMessage(){
		return 'Payment process invoked'; // Hard Coded value
	}
	function sendChatMessage(){
        return'Chat App is invoking...'; // Hard Coded value
    }