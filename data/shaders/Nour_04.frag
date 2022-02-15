
#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;

float rand(float x){
    return fract(sin(x) * 120000.0);
} 

float rand (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))
                            * 43758.5453123);
}

float randomSerie(float x, float freq, float t) {
    return step(.2,rand( floor(x*freq)-floor(t)));
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy *2. -1.;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(1.0, 0.051, 0.051);

    float cols = 4.;
    float freq = rand(floor(u_time))+fract(cos(u_time*0.1)*0.5);
    float t = sin(u_time) * freq* 30.;

    if (fract(st.y*cols * 0.2) < 0.5){
        t *= -.20;
    }

    freq += rand(floor(st.x));

    float offset = 0.5;
    
    
    color = vec3(randomSerie(st.x, freq*106., t+offset),
                 randomSerie(st.x,  freq*100., t),
                 randomSerie(st.x,  freq*12.*sin(u_time*0.1), t-offset));
    
 

    gl_FragColor = vec4(1.-color,1.0);
}