import a from "../images/a.png"
import b from "../images/b.png"
import c from "../images/c.png"
import d from "../images/d.png"
import e from "../images/e.png"
import f from "../images/f.png"
import g from "../images/g.png"
import h from "../images/h.png"
import i from "../images/i.png"
import j from "../images/j.png"
import k from "../images/k.png"
import l from "../images/l.png"
import m from "../images/m.png"
import n from "../images/n.png"
import o from "../images/o.png"
import p from "../images/p.png"
import q from "../images/q.png"
import r from "../images/r.png"
import s from "../images/s.png"
import t from "../images/t.png"
import u from "../images/u.png"
import v from "../images/v.png"
import w from "../images/w.png"
import x from "../images/x.png"
import y from "../images/y.png"
import z from "../images/z.png"

//Module for making array of images out of string

const images = {
    a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
}

//Function for making array of images out of string
const makeImageArray = (sen) => {
    let translatedSentence = []
    for (let i = 0; i < sen.length; i++) {
        translatedSentence.push(images[sen[i]])
    }
    return translatedSentence
}

export { images, makeImageArray }