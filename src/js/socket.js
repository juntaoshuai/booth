var num = -1;
export const port = ['80','9081','1100','500'];
export const socketUrl = 'ws://kmpp.ofweek.com:'
export function socket() {
	
	num ++;
	if(num >= port.length)
		num = 0;
   	return new WebSocket(socketUrl+port[num]);
}