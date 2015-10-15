(in-package :cl-user)
(defpackage rosarium_web.complex
  (:use :cl :parenscript)
  (:import-from :rosarium_web.config
                :*ps-lisp-directory*)
  (:import-from :rosarium_web.psutil
                :defpsclass
                :defpsmethod))
(in-package :rosarium_web.complex)


