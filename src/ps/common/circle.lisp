(in-package :cl-user)
(defpackage rosarium_web.circle
  (:use :cl :parenscript)
  (:import-from :rosarium_web.config
                :*built-js-dic*)
  (:import-from :rosarium_web.psutil
                :defpsclass
                :defpsmethod
                :defps-static))

(in-package :rosarium_web.circle)

(progn
  (setf (gethash #P"common/circle.js" *built-js-dic*)
        (ps:ps
          (defpsclass circle (&optional (center (new (complex)))
                                        (r 0)
                                        (p1 (new (complex center.re (+ center.i r))))
                                        (p2 (new (complex (+ center.re r) center.i)))
                                        (p3 (new (complex center.re (- center.i r)))))
                      (setq this.center center)
                      (setq this.r r)
                      ;;p1, p2, and p3 are used to generate mobius transformations
                      (setq this.p1 p1)
                      (setq this.p2 p2)
                      (setq this.p3 p3))

          (defpsmethod circle fill (ctx)
                       ((@ ctx begin-path))
                       ((@ ctx arc) this.center.re this.center.i this.r
                                0 (* 2 ps:pi) false)
                       ((@ ctx fill))))))


