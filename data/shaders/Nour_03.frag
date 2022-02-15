#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_buffer0;
uniform sampler2D   u_buffer1;
uniform vec2        u_resolution;
uniform float       u_time;

vec4 fracture(vec2 x){
    return texture2D(u_buffer1, fract((x)/u_resolution));
}

float circle(vec2 coord, float radius) {
    return length(coord) - radius;
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}



void main() {
    float waveScale = .5;
    float contribution = 0.1;
    vec4 color = vec4(1.0, 0.902, 0.0, 1.0);
    vec2 uv = gl_FragCoord.xy/u_resolution;

    vec4 old = texture2D(u_buffer1, uv);
    vec4 new = texture2D(u_buffer0, uv);

#ifdef BUFFER_0
    vec2 coord = (gl_FragCoord.xy/u_resolution - 0.5) * 2.0;

    coord = scale (vec2(cos(u_time*2.1)* .5))*coord;
    coord = abs (coord);

    vec4 c = (coord * cos(u_time * 0.2)* 2.75).xxyy;

    c += fracture(gl_FragCoord.xy-c.xy) * 21.7 ;
    c += fracture(gl_FragCoord.xy-c.xy) * 7.2 -2. * cos(u_time * 0.01) * .02;
    

    c = mix(fracture(gl_FragCoord.xy+c.xy), fract(c).brrr, 0.92);
    c = mix(fracture(gl_FragCoord.xy+c.xy), fract(c/vec4(2.7)).argb, .2);
    c = mix(fracture(gl_FragCoord.xy+c.xy), fract(c).argb, .2);
   
    old *= 0.01;
    old += clamp(c, 0.05, 35.);
    c = new*(contribution) + old;

    vec2 off = vec2(0.3,2.2);
    off = vec2(sin(u_time), cos(u_time* 2.1)) * .3;
    float cir = circle(coord + off, 0.3);
    vec4 circle = vec4(vec3(cir), .21);

    gl_FragColor = c+circle;

#elif defined( BUFFER_1 )
    gl_FragColor = texture2D(u_buffer0, uv);

#else    
    gl_FragColor = texture2D(u_buffer1, uv);
#endif
}