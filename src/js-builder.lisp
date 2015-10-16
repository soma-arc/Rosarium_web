(in-package :cl-user)
(defpackage rosarium_web.js-builder
  (:use :cl :parenscript)
  (:import-from :cl-fad
                :list-directory)
  (:import-from :rosarium_web.config
                :*contents-directory*
                :*ps-lisp-directory*
                :*built-js-dic*))
(in-package :rosarium_web.js-builder)

(defun write-js-files (dic)
  (maphash #'(lambda (path js)
               (with-open-file (out
                                (merge-pathnames path *contents-directory*)
                                :direction :output
                                :if-exists :supersede
                                :if-does-not-exist :create)
                 (format out "~A" js)))
           dic))

(write-js-files *built-js-dic*)
