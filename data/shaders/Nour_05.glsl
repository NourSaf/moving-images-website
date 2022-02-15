#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D (vec2 st, float angle) {
    st -= 0.5 ;
    st =  mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle)) * st;
   
   st += 0.5;
    return st;
}

vec2 tile (vec2 st, float closer) {
    st *= closer;
    return abs(st);
}

vec2 rotateTilePattern(vec2 st){

    st *= 3.;

    float index = .0;
    index += step(1., mod(st.x,1.5));
    index += step(1., mod(st.y,1.5))*2.0;

    st = fract(st);

    if(index == 1.0){
        st = rotate2D(st,PI*0.5);
    } else if(index == 2.0){
        st = rotate2D(st,PI*-0.5);
    } else if(index == 1.0){
     st = rotate2D(st,PI);
    }

    return st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy ;

    st = tile(st,3.0);
    st = rotateTilePattern(st);
    st = rotate2D(st,PI*u_time*0.25);
    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.);
}