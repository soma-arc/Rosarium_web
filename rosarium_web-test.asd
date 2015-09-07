(in-package :cl-user)
(defpackage rosarium_web-test-asd
  (:use :cl :asdf))
(in-package :rosarium_web-test-asd)

(defsystem rosarium_web-test
  :author "soma_arc"
  :license ""
  :depends-on (:rosarium_web
               :prove)
  :components ((:module "t"
                :components
                ((:file "rosarium_web"))))
  :perform (load-op :after (op c) (asdf:clear-system c)))
