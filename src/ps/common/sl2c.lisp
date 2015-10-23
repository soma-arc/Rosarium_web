(in-package :cl-user)
(defpackage rosarium_web.sl2c
  (:use :cl :parenscript)
  (:import-from :rosarium_web.config
                :*built-js-dic*)
  (:import-from :rosarium_web.psutil
                :defpsclass
                :defpsmethod
                :defps-static)
  (:import-from :rosarium_web.complex
                :to-complex
                :c-sum
                :c-diff
                :c-prod
                :c-quot)
  (:export :sl2c-prod))

(in-package :rosarium_web.sl2c)

(eval-when (:compile-toplevel :load-toplevel :execute)
  (defun to-sl2c (tree)
    (cond ((numberp tree) `(new (sl2c ,(to-complex tree) (new (complex))
                                      (new (complex))    ,(to-complex tree))))
          ((and (listp tree) (eq (car tree) 'new)) tree)
          ((atom tree) tree)
          (t (cons (to-sl2c (car tree))
                   (to-sl2c (cdr tree))))))

  (defmacro+ps sl2c-prod (&rest args)
    (reduce #'(lambda (arg1 arg2)
                `((@ ,arg1 mult) ,arg2))
            (to-sl2c args))))

(progn
  (setf (gethash #P"common/sl2c.js" *built-js-dic*)
        (ps:ps
          (defpsclass sl2c (&optional (a (@ complex +one+))  (b (@ complex +zero+))
                                      (c (@ complex +zero+)) (d (@ complex +one+)))
                      (setq this.a a)
                      (setq this.b b)
                      (setq this.c c)
                      (setq this.d d))

          (defps-static sl2c +unit+ (new (sl2c)))

          (defpsmethod sl2c mult (m)
                       (if (instanceof m sl2c)
                           (new (sl2c (c-sum (c-prod this.a m.a) (c-prod this.b m.c))
                                      (c-sum (c-prod this.a m.b) (c-prod this.b m.d))
                                      (c-sum (c-prod this.c m.a) (c-prod this.d m.c))
                                      (c-sum (c-prod this.c m.b) (c-prod this.d m.d))))
                           (new (sl2c (c-prod this.a m)
                                      (c-prod this.b m)
                                      (c-prod this.c m)
                                      (c-prod this.d m)))))

          (with-slots (a b c d) m
            (defps-static sl2c inverse
              (lambda (m)
                (sl2c-prod (new (sl2c d (c-prod b -1) (c-prod c -1) a))
                           (c-quot (@ complex +one+)
                                   (c-diff (c-prod a d)
                                           (c-prod b c))))))
            (defps-static sl2c trace
              (lambda (m)
                (c-sum a d)))))))
