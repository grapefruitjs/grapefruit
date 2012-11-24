//Outline shader
{
    uniforms: {
        linewidth:  { type: "f", value: 0.3 },
    },

    vertex_shader: [
        'uniform float linewidth;',

        'void main() {',
            'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
            'vec4 displacement = vec4( normalize( normalMatrix * normal ) * linewidth, 0.0 ) + mvPosition;',
            'gl_Position = projectionMatrix * displacement;',
        '}'
    ].join('\n'),

    fragment_shader: [
        'void main() {',
            'gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );',
        '}'
    ].join('\n')
}