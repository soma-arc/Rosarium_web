(in-package :cl-user)
(defpackage rosarium_web.psutil
  (:use :cl :parenscript)
  (:export :psutil
           :defpsclass
           :defpsmethod))
(in-package :rosarium_web.psutil)

(ps:defmacro+ps defpsclass (name &body body)
  `(defvar ,name (lambda ,@body (return this))))

(ps:defmacro+ps defpsmethod (name class-name &body body)
  `(setf (ps:@ ,class-name prototype ,name) (lambda ,@body)))
