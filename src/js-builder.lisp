(in-package :cl-user)
(defpackage rosarium_web.js-builder
  (:use :cl :parenscript)
  (:import-from :cl-fad
                :list-directory)
  (:import-from :rosarium_web.config
                :*ps-lisp-directory*)
  (:export :js-builder
           :*js-list*))
(in-package :rosarium_web.js-builder)

;;((name js) (name js) ...)
(defparameter *js-list* nil)

