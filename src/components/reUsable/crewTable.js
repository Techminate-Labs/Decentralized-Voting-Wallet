
function  CrewTable({boardData}) {
    return(
        <>
            <div className="row">
                <h5 className='mt-5'>Select Crews : </h5>
                <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            <b>Select All</b>
                        </label>
                    </div>
                    <table className='table table-striped table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Crew</th>
                                <th>Email</th>
                                <th>Work On Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                </td>
                                <td>Bill</td>
                                <td>bill@gmail.com</td>
                                <td>No</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                </td>
                                <td>Joe</td>
                                <td>Joe@gmail.com</td>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                </td>
                                <td>John</td>
                                <td>john@gmail.com</td>
                                <td>No</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default  CrewTable;