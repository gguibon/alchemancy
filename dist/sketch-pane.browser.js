var SketchPane=function(e){function t(t){for(var i,a,o=t[0],h=t[1],l=t[2],u=0,d=[];u<o.length;u++)a=o[u],s[a]&&d.push(s[a][0]),s[a]=0;for(i in h)Object.prototype.hasOwnProperty.call(h,i)&&(e[i]=h[i]);for(c&&c(t);d.length;)d.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],i=!0,o=1;o<r.length;o++){var h=r[o];0!==s[h]&&(i=!1)}i&&(n.splice(t--,1),e=a(a.s=r[0]))}return e}var i={},s={1:0},n=[];function a(t){if(i[t])return i[t].exports;var r=i[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=i,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/dist";var o=window.webpackJsonpSketchPane=window.webpackJsonpSketchPane||[],h=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var c=h;return n.push([202,0]),r()}({201:function(e,t,r){const i=r(89),s=r(99),n=r(37),a=r(95),o=r(93),h=r(91);e.exports=class{constructor(e={backgroundColor:"0xffffff"}){this.layerMask=void 0,this.layerBackground=void 0,this.images={brush:{},grain:{}},this.brushes=a,this.viewportRect=void 0,this.isErasing=!1,this.setup(e),this.setImageSize(e.imageWidth,e.imageHeight)}setup(e){s.setup(),i.settings.FILTER_RESOLUTION=1,i.settings.PRECISION_FRAGMENT=i.PRECISION.HIGH,i.settings.MIPMAP_TEXTURES=!0,i.settings.WRAP_MODE=i.WRAP_MODES.REPEAT,i.utils.skipHello(),this.app=new i.Application({backgroundColor:e.backgroundColor,antialias:!1}),this.app.renderer.roundPixels=!1,this.sketchPaneContainer=new i.Container,this.sketchPaneContainer.name="sketchPaneContainer",this.layerContainer=new i.Container,this.layerContainer.name="layerContainer",this.sketchPaneContainer.addChild(this.layerContainer),this.strokeContainer=new i.Container,this.strokeContainer.name="static",this.liveStrokeContainer=new i.Container,this.liveStrokeContainer.name="live",this.layerContainer.addChild(this.liveStrokeContainer),this.offscreenContainer=new i.Container,this.offscreenContainer.name="offscreen",this.offscreenContainer.renderable=!1,this.layerContainer.addChild(this.offscreenContainer),this.eraseMask=new i.Sprite,this.eraseMask.name="eraseMask",this.app.stage.addChild(this.sketchPaneContainer),this.sketchPaneContainer.scale.set(1),this.strokeInput=[],this.strokePath=void 0,this.lastStaticIndex=0,this.strokeGrainOffset={x:0,y:0}}setImageSize(e,t){this.width=e,this.height=t,this.layerMask=(new i.Graphics).beginFill(0,1).drawRect(0,0,this.width,this.height).endFill(),this.layerMask.name="layerMask",this.layerContainer.mask=this.layerMask,this.sketchPaneContainer.addChild(this.layerMask),this.layerBackground=(new i.Graphics).beginFill(16777215).drawRect(0,0,this.width,this.height).endFill(),this.layerBackground.name="background",this.layerContainer.addChild(this.layerBackground),this.eraseMask.texture=i.RenderTexture.create(this.width,this.height),this.centerContainer(),this.layers=new h({renderer:this.app.renderer,width:this.width,height:this.height}),this.layers.onAdd=this.onLayersCollectionAdd.bind(this),this.layers.onSelect=this.onLayersCollectionSelect.bind(this)}onLayersCollectionAdd(e){let t=this.layers[e];this.layerContainer.position.set(0,0),this.layerContainer.addChild(t.sprite),this.centerContainer()}onLayersCollectionSelect(e){let t=this.layers[e];this.layerContainer.setChildIndex(this.layerBackground,0);let r=1;for(let e of this.layers)this.layerContainer.setChildIndex(e.sprite,r),e.sprite===t.sprite&&(this.layer=r-1,this.layerContainer.setChildIndex(this.offscreenContainer,++r),this.layerContainer.setChildIndex(this.liveStrokeContainer,++r)),r++}newLayer(){return this.layers.create()}centerContainer(){this.sketchPaneContainer.pivot.set(this.width/2,this.height/2),this.sketchPaneContainer.position.set(Math.floor(this.app.renderer.width/2),Math.floor(this.app.renderer.height/2))}resize(e,t){this.app.renderer.resize(e,t);let r=(e/t>this.width/this.height?[this.width*t/this.height,t]:[e,this.height*e/this.width])[0]/this.width;this.sketchPaneContainer.scale.set(r),this.sketchPaneContainer.position.set(Math.floor(this.app.renderer.width/2),Math.floor(this.app.renderer.height/2)),this.viewportRect=this.app.view.getBoundingClientRect()}async loadBrushes({brushImagePath:e}){let t=[...new Set(Object.values(this.brushes).map(e=>e.settings.brushImage))],r=[...new Set(Object.values(this.brushes).map(e=>e.settings.grainImage))],s=[];for(let[n,a]of[[t,this.images.brush],[r,this.images.grain]])for(let t of n){let r=i.Sprite.fromImage(`${e}/${t}.png`);r.renderable=!1,a[t]=r;let n=r._texture.baseTexture;n.hasLoaded?s.push(Promise.resolve(r)):n.isLoading?s.push(new Promise((e,t)=>{n.on("loaded",t=>e(n)),n.on("error",e=>t(e))})):s.push(Promise.reject(new Error))}await Promise.all(s),this.setDefaultBrush()}stampStroke(e,t){this.layers.getCurrentLayer().draw(e,!1)}disposeContainer(e){for(let t of e.children)t.destroy({children:!0,texture:!1,baseTexture:!1});e.removeChildren()}addStrokeNode(e,t,r,s,n,a,h,l,c,u,d,p,g,m){let f=new i.Sprite.from(this.images.brush[d.settings.brushImage].texture),y=s-(1-l)*s*d.settings.pressureSize;y*=u/90*d.settings.tiltSize*3+1;let v,C=1-(1-l)*d.settings.pressureOpacity;C*=(1-u/90*d.settings.tiltOpacity)*n,v=d.settings.azimuth?c*Math.PI/180-this.sketchPaneContainer.rotation:0-this.sketchPaneContainer.rotation;let x=45*Math.PI/180,k=Math.abs(y*Math.sin(x))+Math.abs(y*Math.cos(x)),I=Math.ceil(k);a-=I/2,h-=I/2,f.x=Math.floor(a),f.y=Math.floor(h),f.width=I,f.height=I;let w=a-f.x,S=h-f.y,b=y/f.width,M=[w,S],P=[b,b],_=this.images.grain[d.settings.grainImage];this.offscreenContainer.addChild(_),this.offscreenContainer.getLocalBounds();let O=new o(_);O.filterArea=this.app.screen,O.uniforms.uRed=e,O.uniforms.uGreen=t,O.uniforms.uBlue=r,O.uniforms.uOpacity=C,O.uniforms.uRotation=v,O.uniforms.uBleed=Math.pow(1-l,1.6)*d.settings.pressureBleed,O.uniforms.uGrainScale=d.settings.scale,O.uniforms.uGrainRotation=d.settings.rotation,O.uniforms.u_x_offset=p*d.settings.movement,O.uniforms.u_y_offset=g*d.settings.movement,O.uniforms.u_offset_px=M,O.uniforms.u_node_scale=P,O.padding=1,f.filters=[O],m.addChild(f)}down(e){this.pointerDown=!0,this.strokeInput=[],this.strokePath=new s.Path,this.lastStaticIndex=0,this.lastSpacing=void 0,this.strokeGrainOffset=this.brush.settings.randomOffset?{x:Math.floor(100*Math.random()),y:Math.floor(100*Math.random())}:{x:0,y:0},this.addPointerEventAsPoint(e),this.isErasing?this.liveStrokeContainer.parent&&this.liveStrokeContainer.parent.removeChild(this.liveStrokeContainer):this.layerContainer.addChild(this.liveStrokeContainer),this.renderLive(),this.app.view.style.cursor="crosshair"}move(e){this.addPointerEventAsPoint(e),this.renderLive(),this.app.view.style.cursor="crosshair"}up(e){this.addPointerEventAsPoint(e),this.layerContainer.addChild(this.liveStrokeContainer),this.renderLive(!0),this.disposeContainer(this.liveStrokeContainer),this.offscreenContainer.removeChildren(),this.layers.markDirtyIfActive(),this.app.view.style.cursor="auto",this.pointerDown=!1}getInterpolatedStrokeInput(e,t){let r=[],i=[];for(let e=0;e<t.segments.length;e++)t.segments[e].location&&i.push(t.segments[e].location.offset);let s=0,a=Math.max(1,this.brushSize*this.brush.settings.spacing);null==this.lastSpacing&&(this.lastSpacing=a);let o=a-this.lastSpacing,h=0,l=t.length+-(this.lastSpacing+t.length);for(h=o;h<t.length;h+=a){let a=t.getPointAt(h);for(var c=s;c<i.length;c++)i[c]<h&&(s=c);let o=(h-i[s])/(i[s+1]-i[s]),u=n.lerp(e[s].pressure,e[s+1].pressure,o),d=n.lerp(e[s].tiltAngle,e[s+1].tiltAngle,o),p=n.lerp(e[s].tilt,e[s+1].tilt,o);r.push([this.isErasing?0:(this.brushColor>>16&255)/255,this.isErasing?0:(this.brushColor>>8&255)/255,this.isErasing?0:(255&this.brushColor)/255,this.brushSize,this.brushOpacity,a.x,a.y,u,d,p,this.brush,this.strokeGrainOffset.x,this.strokeGrainOffset.y]),l=h}return this.lastSpacing=t.length-l,r}renderStroke(e,t,r){let i=this.getInterpolatedStrokeInput(e,t);for(let e of i)this.addStrokeNode(...e,r)}addPointerEventAsPoint(e){let t=this.sketchPaneContainer.toLocal({x:e.x-this.viewportRect.x,y:e.y-this.viewportRect.y},this.app.stage),r="mouse"===e.pointerType?e.pressure>0?.5:0:e.pressure,i="mouse"===e.pointerType?{angle:-90,tilt:37}:n.calcTiltAngle(e.tiltX,e.tiltY);this.strokeInput.push({x:t.x,y:t.y,pressure:r,tiltAngle:i.angle,tilt:i.tilt}),this.strokeInput=this.strokeInput.slice(Math.max(0,this.lastStaticIndex-2),this.strokeInput.length),this.strokePath=new s.Path(this.strokeInput),this.strokePath.smooth({type:"catmull-rom",factor:.5})}renderLive(e=!1){let t=this.strokeInput.length;if(e){let e=this.strokeInput.length-1,t=this.lastStaticIndex,r=e;return r+1-t<=1?void console.warn("1 or fewer points remaining"):(console.log("final render",t,r,e,t,r+1),this.renderStroke(this.strokeInput.slice(t,r+1),new s.Path(this.strokePath.segments.slice(t,r+1)),this.strokeContainer),this.isErasing?this.updateMask(this.strokeContainer,!0):this.stampStroke(this.strokeContainer,this.layers.getCurrentLayer()),this.disposeContainer(this.strokeContainer),void this.offscreenContainer.removeChildren())}if(t>=3){let e=this.strokeInput.length-1,t=e-2,r=e-1;this.renderStroke(this.strokeInput.slice(t,r+1),new s.Path(this.strokePath.segments.slice(t,r+1)),this.strokeContainer),this.isErasing?this.updateMask(this.strokeContainer):this.stampStroke(this.strokeContainer,this.layers.getCurrentLayer()),this.disposeContainer(this.strokeContainer),this.offscreenContainer.removeChildren(),this.lastStaticIndex=r}if(t>=2){this.disposeContainer(this.liveStrokeContainer);let e=this.strokeInput.length-1,t=e-1,r=e;if(this.isErasing);else{let e=this.lastSpacing;this.renderStroke(this.strokeInput.slice(t,r+1),new s.Path(this.strokePath.segments.slice(t,r+1)),this.liveStrokeContainer),this.lastSpacing=e}}}updateMask(e,t=!1){let r=this.layers.getActiveIndices().sort((e,t)=>t-e)[0];if(!this.layers[r].sprite.mask){this.layerContainer.addChild(this.eraseMask);let e=(new i.Graphics).beginFill(16711680,1).drawRect(0,0,this.width,this.height).endFill();this.app.renderer.render(e,this.eraseMask.texture,!0);for(let e of this.layers.getActiveIndices()){this.layers[e].sprite.mask=this.eraseMask}}if(this.app.renderer.render(e,this.eraseMask.texture,!1),t){for(let e of this.layers.getActiveIndices()){let t=this.layers[e];t.sprite.mask=this.eraseMask,this.stampMask(t.sprite),t.sprite.mask=null}this.layerContainer.removeChild(this.eraseMask)}}stampMask(e){let t=i.RenderTexture.create(this.width,this.height);this.app.renderer.render(e,t,!0,e.transform.worldTransform.invert(),!0);let r=new i.Sprite.from(t);this.app.renderer.render(r,e.texture,!0),r.destroy({texture:!0,baseTexture:!1})}replaceLayer(e,t,r=!0){e=null==e?this.layers.getCurrentIndex():e,this.layers[e].draw(new i.Sprite.from(t),r)}getLayerCanvas(e){return console.warn("SketchPane#getLayerCanvas is deprecated. Please fix the caller to use a different method."),e=null==e?this.layers.getCurrentIndex():e,this.app.renderer.plugins.extract.canvas(this.layers[e].sprite.texture)}exportLayer(e,t="base64"){return e=null==e?this.layers.getCurrentIndex():e,this.layers[e].export(t)}clearLayer(e){e=null==e?this.layers.getCurrentIndex():e,this.layers[e].clear()}getNumLayers(){return this.layers.length-1}getCurrentLayerIndex(e){return this.layers.getCurrentIndex()}setCurrentLayerIndex(e){this.pointerDown||this.layers.setCurrentIndex(e)}setDefaultBrush(){this.brush=this.brushes.pencil,this.brushColor=0,this.brushSize=4,this.brushOpacity=.9}getIsErasing(){return this.isErasing}setIsErasing(e){this.pointerDown||(this.isErasing=e)}setErasableLayers(e){this.layers.setActiveIndices(e)}getLayerOpacity(e){return this.layers[e].getOpacity()}setLayerOpacity(e,t){this.layers[e].setOpacity(t)}getActiveLayerIndices(){return this.layers.getActiveIndices()}getDOMElement(){return this.app.view}}},202:function(e,t,r){const i=r(201);e.exports=i},37:function(e,t){e.exports=class{static rotatePoint(e,t,r,i,s){return{x:Math.cos(s)*(e-r)-Math.sin(s)*(t-i)+r,y:Math.sin(s)*(e-r)+Math.cos(s)*(t-i)+i}}static calcTiltAngle(e,t){return{angle:Math.atan2(e,t)*(180/Math.PI),tilt:Math.max(Math.abs(e),Math.abs(t))}}static lerp(e,t,r){return e+(t-e)*(r=(r=r<0?0:r)>1?1:r)}static arrayPostDivide(e){for(let t=0;t<e.length;t+=4){const r=e[t+3];r&&(e[t]=Math.round(Math.min(255*e[t]/r,255)),e[t+1]=Math.round(Math.min(255*e[t+1]/r,255)),e[t+2]=Math.round(Math.min(255*e[t+2]/r,255)))}}}},90:function(e,t,r){const i=r(89),s=r(37);e.exports=class{constructor({renderer:e,width:t,height:r}){this.renderer=e,this.width=t,this.height=r,this.sprite=new i.Sprite(i.RenderTexture.create(this.width,this.height)),this.dirty=!1}getOpacity(){return this.sprite.alpha}setOpacity(e){this.sprite.alpha=e}export(e){let t=this.renderer.plugins.extract.pixels(this.sprite.texture);s.arrayPostDivide(t);const r=new i.CanvasRenderTarget(this.width,this.height);let n=r.context.getImageData(0,0,this.width,this.height);return n.data.set(t),r.context.putImageData(n,0,0),r.canvas.toDataURL().replace(/^data:image\/\w+;base64,/,"")}draw(e,t=!1){this.renderer.render(e,this.sprite.texture,t)}clear(){this.renderer.clearRenderTexture(this.sprite.texture)}}},91:function(e,t,r){const i=r(90);e.exports=class extends Array{constructor({renderer:e,width:t,height:r}){super(),this.renderer=e,this.width=t,this.height=r,this.activeIndices=[],this.currentIndex=void 0,this.onAdd=void 0,this.onSelect=void 0}create(){let e=new i({renderer:this.renderer,width:this.width,height:this.height});return this.add(e),e}add(e){let t=this.length;return this.push(e),e.index=t,e.name=`Layer ${t+1}`,e.sprite.name=e.name,this.onAdd&&this.onAdd(e.index),e}markDirtyIfActive(){for(let e of this.activeIndices)this[e].dirty=!0}getActiveIndices(){return[...this.activeIndices]}setActiveIndices(e){this.activeIndices=[...e]}getCurrentIndex(){return this.currentIndex}setCurrentIndex(e){this.currentIndex=e,this.onSelect&&this.onSelect(e)}getCurrentLayer(){return this[this.currentIndex]}}},92:function(e,t){e.exports="precision highp float;\n\n// brush texture\nuniform sampler2D uSampler;\n// grain texture\nuniform sampler2D u_grainTex;\n\n// color\nuniform float uRed;\nuniform float uGreen;\nuniform float uBlue;\n\n// node\nuniform float uOpacity;\nuniform float uRotation;\n\n// grain\nuniform float uBleed;\nuniform float uGrainRotation;\nuniform float uGrainScale;\nuniform float u_x_offset;\nuniform float u_y_offset;\n\n// brush\nuniform vec2 u_offset_px;\nuniform vec2 u_node_scale;\n\n// from vert shader\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\n// from PIXI\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 filterClamp;\nuniform mat3 filterMatrix;\n\nvec2 rotate (vec2 v, float a) {\n\tfloat s = sin(a);\n\tfloat c = cos(a);\n\tmat2 m = mat2(c, -s, s, c);\n\treturn m * v;\n}\n\nvec2 scale (vec2 v, vec2 _scale) {\n\tmat2 m = mat2(_scale.x, 0.0, 0.0, _scale.y);\n\treturn m * v;\n}\n\nvec2 mapCoord (vec2 coord) {\n  coord *= filterArea.xy;\n  return coord;\n}\n\nvec2 unmapCoord (vec2 coord) {\n  coord /= filterArea.xy;\n  return coord;\n}\n\nvoid main(void) {\n  // user's intended brush color\n  vec3 color = vec3(uRed, uGreen, uBlue);\n\n\t//\n\t//\n\t// brush\n\t//\n  vec2 coord = mapCoord(vTextureCoord) / dimensions;\n\n\t// translate by the subpixel\n\tcoord -= u_offset_px / dimensions;\n\n  // move space from the center to the vec2(0.0)\n  coord -= vec2(0.5);\n\n  // rotate the space\n  coord = rotate(coord, uRotation);\n\n  // move it back to the original place\n  coord += vec2(0.5);\n\n\t// scale\n\tcoord -= 0.5;\n  coord *= 1.0 / u_node_scale;\n\tcoord += 0.5;\n\n\tcoord = unmapCoord(coord * dimensions);\n\n\t//\n\t//\n\t// grain\n\t//\n\tfloat grain_scale = 1024.00 * uGrainScale;\n\n\tvec2 fcoord = vFilterCoord;\n\tfcoord -= (vec2(u_x_offset, u_y_offset) / grain_scale);\n\tvec4 grainSample = texture2D(u_grainTex, fract(fcoord));\n\n\t//\n\t//\n\t// set gl_FragColor\n\t//\n\t// clamp (via https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters#bleeding-problem)\n\tif (coord == clamp(coord, filterClamp.xy, filterClamp.zw)) {\n\t\t// read a sample from the texture\n\t  vec4 brushSample = texture2D(uSampler, coord);\n\t  // tint\n\t  gl_FragColor = vec4(color, 1.);\n\t\tgl_FragColor *= ((brushSample.r * grainSample.r * (1.0+uBleed))- uBleed ) * (1.0+ uBleed) * uOpacity;\n\n\t\t// gl_FragColor = grain;\n\t} else {\n\t\t// don't draw\n\t\tgl_FragColor = vec4(0.);\n\t}\n}\n"},93:function(e,t,r){const i=r(92);e.exports=class extends PIXI.Filter{constructor(e){super(null,i,{uRed:{type:"1f",value:.5},uGreen:{type:"1f",value:.5},uBlue:{type:"1f",value:.5},uOpacity:{type:"1f",value:1},uRotation:{type:"1f",value:0},uBleed:{type:"1f",value:0},uGrainRotation:{type:"1f",value:0},uGrainScale:{type:"1f",value:1},u_x_offset:{type:"1f",value:0},u_y_offset:{type:"1f",value:0},u_offset_px:{type:"vec2"},u_node_scale:{type:"vec2",value:[0,0]},u_grainTex:{type:"sampler2D",value:""},dimensions:{type:"vec2",value:[0,0]},filterMatrix:{type:"mat3"}}),this.padding=0,this.blendMode=PIXI.BLEND_MODES.NORMAL,this.autoFit=!1;let t=new PIXI.Matrix;e.renderable=!1,this.grainSprite=e,this.grainMatrix=t,this.uniforms.u_grainTex=e._texture,this.uniforms.filterMatrix=t}apply(e,t,r,i){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,this.uniforms.filterMatrix=e.calculateSpriteMatrix(this.grainMatrix,this.grainSprite),e.applyFilter(this,t,r,i)}}},94:function(e,t){const r={name:"default",blendMode:"normal",sizeLimitMax:1,sizeLimitMin:0,opacityMax:1,opacityMin:0,spacing:0,brushImage:"brushcharcoal",brushRotation:0,brushImageInvert:!1,grainImage:"graingrid",grainRotation:0,grainImageInvert:!1,movement:1,scale:1,zoom:0,rotation:0,randomOffset:!0,azimuth:!0,pressureOpacity:1,pressureSize:1,pressureBleed:0,tiltAngle:0,tiltOpacity:1,tiltGradiation:0,tiltSize:1,orientToScreen:!0};e.exports=class{constructor(e){this.settings=Object.assign({},r,e)}}},95:function(e,t,r){const i=r(94);e.exports=[{name:"default",descriptiveName:"Default Brush"},{name:"pencil",descriptiveName:"Pencil",brushImage:"brushmediumoval",grainImage:"grainpaper4",pressureOpacity:.7,pressureSize:.8,scale:.8,tiltOpacity:.3,tiltSize:1,movement:1,pressureBleed:1,spacing:.05},{name:"brushpen",descriptiveName:"Brush Pen Bobby",brushImage:"teardrop",grainImage:"hardwood",pressureOpacity:.3,scale:.5,movement:.7,sizecale:.6},{name:"pen",descriptiveName:"Pen",brushImage:"brushhard",grainImage:"grainpaper2",pressureOpacity:.5,pressureSize:.8,sizecale:.8,pressureBleed:2,tiltSize:3.8,tiltOpacity:1,movement:.9,spacing:.05},{name:"copic",descriptiveName:"Copic",brushImage:"brushmediumovalhallow",grainImage:"grainpaper2",pressureOpacity:.2,pressureSize:.9,tiltSize:1,tiltOpacity:1,movement:.5},{name:"charcoal",descriptiveName:"Charcoal",brushImage:"brushcharcoal",grainImage:"graincanvas",pressureOpacity:.4,pressureSize:.8,sizecale:1,tiltOpacity:.4,tiltSize:1,spacing:.05,pressureBleed:.5},{name:"watercolor",descriptiveName:"Watercolor",brushImage:"brushwatercolor",grainImage:"grainwatercolor1",pressureOpacity:1,pressureSize:1,sizecale:1,tiltOpacity:1,tiltSize:1,spacing:.05,pressureBleed:.5},{name:"clouds",descriptiveName:"Clouds",brushImage:"brushclouds",grainImage:"grainclouds",pressureOpacity:1,pressureSize:1,sizecale:1,tiltOpacity:1,tiltSize:1,spacing:.1,movement:1},{name:"slate",descriptiveName:"Clouds",brushImage:"flatbrush",grainImage:"grainslate",pressureOpacity:1,pressureSize:1,sizecale:1,tiltOpacity:1,tiltSize:1,movement:1,spacing:.05}].reduce((e,t)=>(e[t.name]=new i(t),e),{})},96:function(e,t){},98:function(e,t){}});