export default function throttle(fn, context, delay, text){
    clearTimeout(fn.timeoutId);
    fn.timeoutId = setTimeout(function(){
        fn.call(null, text, context);
    },delay);
}
