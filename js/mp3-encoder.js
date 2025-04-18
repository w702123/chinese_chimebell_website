// Convert WAV to MP3
// Reference: https://github.com/zhuker/lamejs
// Reference of how to use lamejs: https://scribbler.live/2024/12/05/Coverting-Wav-to-Mp3-in-JavaScript-Using-Lame-js.html

// Import lamejs modules
const { Mp3Encoder } = lamejs;

// Create MP3 encoder instance
const mp3Encoder = new Mp3Encoder(1, 44100, 128); // 1 channel, 44100Hz, 128kbps

// Function to convert WAV to MP3
window.convertWavToMp3 = async function(wavBlob) {
    try {
        console.log('Converting WAV to MP3...');
        console.log('WAV blob:', wavBlob);
        
        // Convert blob to array buffer
        const arrayBuffer = await wavBlob.arrayBuffer();
        console.log('Array buffer created');
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Audio context created');
        
        // Decode audio data
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log('Audio data decoded');
        
        // Get PCM data
        const pcmData = audioBuffer.getChannelData(0);
        console.log('PCM data length:', pcmData.length);
        
        const mp3Data = [];
        
        // Convert float32 to int16
        const samples = new Int16Array(pcmData.length);
        for (let i = 0; i < pcmData.length; i++) {
            samples[i] = pcmData[i] * 32768;
        }
        console.log('Samples converted to int16');
        
        // Encode to MP3
        const mp3buf = mp3Encoder.encodeBuffer(samples);
        console.log('MP3 buffer created, length:', mp3buf.length);
        
        if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
        }
        
        // Flush encoder
        const end = mp3Encoder.flush();
        console.log('Encoder flushed, length:', end.length);
        
        if (end.length > 0) {
            mp3Data.push(end);
        }
        
        // Create MP3 blob
        const mp3Blob = new Blob(mp3Data, { type: 'audio/mp3' });
        console.log('MP3 blob created:', mp3Blob);
        
        return mp3Blob;
    } catch (error) {
        console.error('Error in convertWavToMp3:', error);
        console.error('Error stack:', error.stack);
        throw error;
    }
};