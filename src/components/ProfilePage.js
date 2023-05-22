import React, { useEffect, useState } from "react";
import { useAuth } from "./auth";
import UserService from "../services/UserService";
import swal from "sweetalert";

export function ProfilePage() {
  const { auth } = useAuth();
  const username = auth?.username;
  const [name, setName] = useState();

  useEffect(() => {
    document.title = "I Love LAW - Profile";
    const api = async () => {
      const user = (await UserService.getInfo(username)).data;
      setName(user.name);
    };

    api();
  }, [username]);

  const submit = async () => {
    await swal({
      title: "Warning!",
      text: "Apakah yakin mengubah profile Anda?",
      icon: "warning",
      buttons: ["Tidak, Batalkan", "Ya, Ubah"],
      dangerMode: true,
    }).then(async (ubah) => {
      if (ubah) {
        await UserService.ubahProfile(username, name);
        await swal({
          title: "Success!",
          text: "Profile anda berhasil diubah.",
          icon: "success",
          buttons: [false, "Tutup"],
        });
        window.location.reload();
      }
    });
  };

  return (
    <section className="container">
      <div className="card mt-5" style={{ width: "100%" }}>
        <div
          className="card-header text-center"
          style={{ backgroundColor: "rgb(170,194,236)" }}
        >
          <h3 className="my-auto">Profil</h3>
        </div>
        <div className="card-body">
          <div className="row my-3">
            <div className="col-12">
              <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput1"
                      className="form-label"
                    >
                      Username <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={username}
                      className="form-control input-text border-blue rounded-3 border-1"
                      id="formGroupExampleInput1"
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="col-1"></div>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-12">
              <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Nama <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      className="form-control input-text border-blue rounded-3 border-1"
                      id="formGroupExampleInput2"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-1"></div>
              </div>
            </div>
          </div>

          <div className="row mt-5 mb-3">
            <div className="col-5"></div>
            <div className="col-2 text-center">
              <button
                type="submit"
                className="btn btn-blue btn-lg"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={submit}
                id="submit1"
              >
                Ubah
              </button>
            </div>
            <div className="col-5"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
