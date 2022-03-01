import triVs from '../glsl/tri.vert';
import triFs from '../glsl/tri.frag';
import { Util } from "../libs/util";
import { Mesh } from 'three/src/objects/Mesh';
import { DoubleSide } from 'three/src/constants';
import { Func } from "../core/func";
import { Vector3 } from "three/src/math/Vector3";
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Object3D } from "three/src/core/Object3D";
import { Scroller } from "../core/scroller";
import { Conf } from '../core/conf';
import { MyObject3D } from '../webgl/myObject3D';

export class Item extends MyObject3D {

  private _con:Object3D
  private _tri:Mesh

  public itemSize:Vector3 = new Vector3()

  constructor(opt:any = {}) {
    super()

    this._con = new Object3D()
    this.add(this._con)

    this._tri = new Mesh(
      opt.geo,
      new ShaderMaterial({
        vertexShader:triVs,
        fragmentShader:triFs,
        transparent:true,
        side:DoubleSide,
        uniforms:{
          alpha:{value:1},
          color:{value:opt.col[0]},
        }
      })
    )
    this._con.add(this._tri)

    // 基準点ずらす
    this._tri.position.x = 0.5
  }


  // ---------------------------------
  // 更新
  // ---------------------------------
  protected _update():void {
    super._update()

    const sw = Func.instance.sw()
    const sh = Func.instance.sh()
    const s = Scroller.instance.val.y

    const sukima = 1
    this._con.position.y = 0
    const num = Conf.instance.ROT_NUM
    const it = (Conf.instance.SCROLL_HEIGHT * sh - sh) / num
    for(let i = 0; i < num; i++) {
      const start = i * it
      const end = start + (it * sukima)
      const r = Util.instance.map(s, 0, 1, start, end)
      const nowAng = 180 * i
      const addAng = i % 2 == 0 ? 180 : -180
      if(i == 0 || r > 0) this._con.rotation.z = Util.instance.radian(Util.instance.mix(nowAng, nowAng + addAng, r))
      if(i % 2 != 0 && r >= 1) {
        this._tri.position.y = 0.5
      }
      if(i % 2 == 0 && r >= 1) {
        this._tri.position.y = -0.5
      }
      if(i == 0 && r < 1) {
        this._tri.position.y = 0.5
      }
      if(r >= 1) this._con.position.y -= this._con.scale.y
    }

    const size = sw / Conf.instance.LINE
    this._con.scale.set(size, size, 1)

    this.itemSize.x = size
    this.itemSize.y = size
  }
}