uniform vec3 color;
uniform float alpha;

varying vec2 vUv;

void main(void) {
  // float a = step(vUv.x * 0.5, vUv.y);
  // if(vUv.y >= 0.5) {
  //   a = step(vUv.x * 0.5, 1.0 - vUv.y);
  // }
  // float a = step(vUv.x, vUv.y);
  float a = step(vUv.x, 0.5);
  // vec3 c = mix(vec3(0.0), color,  step(vUv.x, vUv.y * 0.95));
  vec3 c = color;
  vec4 dest = vec4(c, a);
  gl_FragColor = dest;
}
