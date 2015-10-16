(in-package :cl-user)
(defpackage rosarium_web.complex
  (:use :cl :parenscript)
  (:import-from :rosarium_web.config
                :*built-js-dic*)
  (:import-from :rosarium_web.psutil
                :defpsclass
                :defpsmethod
                :defps-static)
  (:export :complex
           :c-sum
           :c-diff
           :c-prod))

(in-package :rosarium_web.complex)

(defun build-complex ()
  (ps:ps
    (defpsclass complex (&optional (re 0) (im 0))
                (setq this.re re)
                (setq this.im im))
    (defps-static complex
        +infinity+
      (new (complex (@ -number +positive_infinity+)
                    (@ -number +positive_infinity+))))
    (defps-static complex
        +zero+
      (new (complex)))
    (defps-static complex
        +one+
      (new (complex 1)))
    (defps-static complex
        +i+
      (new (complex 0 1)))
    (defps-static complex
        +epsilon+ 0.000001)

    (defpsmethod complex add (c)
                 (new (complex (+ this.re c.re)
                               (+ this.im c.im))))
    (defpsmethod complex sub (c)
                 (new (complex (- this.re c.re)
                               (- this.im c.im))))
    (defpsmethod complex mult (c)
                 (new (complex (- (* this.re c.re)
                                  (* this.im c.im))
                               (+ (* this.re c.im)
                                  (* this.im c.re)))))
    (defpsmethod complex div (c)
                 (let ((denom (+ (* c.re c.re)
                                 (* c.im c.im))))
                   (cond ((= denom 0)
                          (@ complex +infinity+))
                         ((= denom (@ -number +positive_infinity+))
                          (@ complex +zero+))
                         (t (new (complex (/ (+ (* this.re c.re)
                                                (* this.im c.im))
                                             denom)
                                          (/ (- (* this.im c.re)
                                                (* this.re c.im))
                                             denom)))))))
    (defps-static complex dist
      (lambda (c1 c2)
        (sqrt (+ (expt (- c1.re c2.re) 2)
                 (expt (- c1.im c2.im) 2)))))
    (defps-static complex sqrt
      (lambda (c)
        (let ((len (sqrt (+ (expt (- c1.re c2.re) 2)
                            (expt (- c1.im c2.im) 2)))))
          (cond ((> c.im 0)
                 (new (complex (/ (sqrt (+ c.re len))
                                  (sqrt 2))
                               (/ (sqrt (+ (- c.re) len))
                                  (sqrt 2)))))
                ((< c.im 0)
                 (new (complex (/ (sqrt (+ c.re len))
                                  (sqrt 2))
                               (/ (- (sqrt (+ (- c.re) len)))
                                  (sqrt 2)))))
                ((< c.re 0)
                 (new (complex 0 (sqrt (abs c.re)))))
                (t (new (complex (sqrt c.re))))))))
    (defps-static complex infinityp
      (lambda (c)
        (or (= c.re (@ -number +positive_infinity+))
            (= c.im (@ -number +positive_infinity+)))))
    (defps-static complex zerop
      (lambda (c)
        (and (= c.re 0)
             (= c.im 0))))
    (defps-static complex realp
      (lambda (c)
        (= c.im 0)))))

(defun to-complex (tree)
       (cond ((numberp tree) `(new (complex ,tree)))
             ((and (listp tree) (eq (car tree) 'new)) tree)
             ((atom tree) tree)
             (t (cons (to-complex (car tree))
                      (to-complex (cdr tree))))))

(defmacro+ps c-sum (&rest args)
  (reduce #'(lambda (arg1 arg2)
	      `((@ ,arg1 add) ,arg2))
          (to-complex args)))

(defmacro+ps c-diff (&rest args)
  (reduce #'(lambda (arg1 arg2)
	      `((@ ,arg1 sub) ,arg2))
          (to-complex args)))

(defmacro+ps c-prod (&rest args)
  (reduce #'(lambda (arg1 arg2)
	      `((@ ,arg1 sub) ,arg2))
          (to-complex args)))

(setf (gethash #P"common/complex.js" *built-js-dic*)
      (build-complex))
