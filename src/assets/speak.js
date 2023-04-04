
function speak(text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); // removes anything 'stuck'
        speechSynthesis.getVoices();
        // Safari loads voices synchronously so now safe to enable
    } else {
        Alert('Your Device does not support voice chat, Try text chat')
    }

    const utter = new SpeechSynthesisUtterance();
    utter.text = text;
    speechSynthesis.speak(utter);
}